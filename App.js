import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
	Button,
} from 'react-native';

export default function App() {
	const [gameState, setGameState] = useState([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	]);
	const [currentPlayer, setCurrentPlayer] = useState(1);

	const renderIcon = (row, col) => {
		var value = gameState[row][col];
		switch (value) {
			case 1:
				return <Text style={styles.tileX}>X</Text>;
			case -1:
				return <Text style={styles.tileO}>O</Text>;
			default:
				return <View />;
		}
	};

	const playerTurn = () => {
		switch (currentPlayer) {
			case 1:
				return (
					<Text style={styles.playerChance}>
						Chance of <Text style={{ color: 'red' }}>X</Text>
					</Text>
				);
			case -1:
				return (
					<Text style={styles.playerChance}>
						Chance of <Text style={{ color: 'green' }}>0</Text>
					</Text>
				);
			default:
				return <View />;
		}
	};

	const startGame = () => {
		setGameState([
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
		]);
		setCurrentPlayer(1);
	};

	const onTilePress = (row, col) => {
		if (gameState[row][col] !== 0) return;
		// setting up the tile
		let newGameState = gameState.slice();
		newGameState[row][col] = currentPlayer;
		setGameState(newGameState);

		// switching up the player
		let nextPlayer = currentPlayer === 1 ? -1 : 1;
		setCurrentPlayer(nextPlayer);
		let winner = getWinner(newGameState);
		if (winner === 1) {
			Alert.alert('Player X is the winner');
			startGame();
		} else if (winner === -1) {
			Alert.alert('Player O is the winner');
			startGame();
		}
	};

	const getWinner = (arr) => {
		var sum;

		// check row
		for (var i = 0; i < 3; i++) {
			sum = arr[i][0] + arr[i][1] + arr[i][2];
			if (sum === 3) return 1;
			else if (sum === -3) return -1;
		}

		// check column
		for (var i = 0; i < 3; i++) {
			sum = arr[0][i] + arr[1][i] + arr[2][i];
			if (sum === 3) return 1;
			else if (sum === -3) return -1;
		}

		// check first diagonal
		sum = arr[0][0] + arr[1][1] + arr[2][2];
		if (sum === 3) return 1;
		else if (sum === -3) return -1;

		// check second diagonal
		sum = arr[0][2] + arr[1][1] + arr[2][0];
		if (sum === 3) return 1;
		else if (sum === -3) return -1;

		// return 0 for no winner
		return 0;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Tic-Tac-Toe</Text>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={[
						styles.tile,
						{ borderLeftWidth: 0, borderTopWidth: 0 },
					]}
					onPress={() => onTilePress(0, 0)}
				>
					{renderIcon(0, 0)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tile, { borderTopWidth: 0 }]}
					onPress={() => onTilePress(0, 1)}
				>
					{renderIcon(0, 1)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.tile,
						{ borderRightWidth: 0, borderTopWidth: 0 },
					]}
					onPress={() => onTilePress(0, 2)}
				>
					{renderIcon(0, 2)}
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={[styles.tile, { borderLeftWidth: 0 }]}
					onPress={() => onTilePress(1, 0)}
				>
					{renderIcon(1, 0)}
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.tile}
					onPress={() => onTilePress(1, 1)}
				>
					{renderIcon(1, 1)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tile, { borderRightWidth: 0 }]}
					onPress={() => onTilePress(1, 2)}
				>
					{renderIcon(1, 2)}
				</TouchableOpacity>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					style={[
						styles.tile,
						{ borderLeftWidth: 0, borderBottomWidth: 0 },
					]}
					onPress={() => onTilePress(2, 0)}
				>
					{renderIcon(2, 0)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.tile, { borderBottomWidth: 0 }]}
					onPress={() => onTilePress(2, 1)}
				>
					{renderIcon(2, 1)}
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.tile,
						{ borderRightWidth: 0, borderBottomWidth: 0 },
					]}
					onPress={() => onTilePress(2, 2)}
				>
					{renderIcon(2, 2)}
				</TouchableOpacity>
			</View>
			{playerTurn()}
			<View style={styles.buttonView}>
				<Button title="New Game" onPress={startGame}></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	heading: {
		color: '#000',
		position: 'absolute',
		top: 100,
		fontSize: 30,
	},
	tile: {
		borderWidth: 5,
		borderColor: '#000000',
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	tileX: {
		color: 'red',
		fontSize: 60,
	},
	tileO: {
		color: 'green',
		fontSize: 60,
	},
	playerChance: {
		color: '#000',
		position: 'absolute',
		bottom: 150,
		fontSize: 30,
	},
	buttonView: {
		position: 'absolute',
		bottom: 40,
	},
});
