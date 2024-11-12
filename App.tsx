/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Button } from './src/components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/theme/colors';

const { width } = Dimensions.get('window');

type SectionProps = PropsWithChildren<{
  title: string;
}>;

// function Section({ children, title }: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [serving, setServing] = useState('A');
  const [winner, setWinner] = useState<string | null>(null);
  const [animation] = useState(new Animated.Value(0));

  const incrementScore = (team: 'A' | 'B') => {
    if (winner) return;

    const setScore = team === 'A' ? setScoreA : setScoreB;
    const otherScore = team === 'A' ? scoreB : scoreA;

    setScore(prevScore => {
      const newScore = prevScore + 1;
      if ((newScore >= 21 && newScore - otherScore >= 2) || newScore === 30) {
        setWinner(team);
      }
      return newScore;
    });

    setServing(prev => (prev === 'A' ? 'B' : 'A'));
  };

  const decrementScore = (team: 'A' | 'B') => {
    if (winner) return;

    const setScore = team === 'A' ? setScoreA : setScoreB;
    setScore(prevScore => Math.max(0, prevScore - 1));
  };

  const resetScores = () => {
    setScoreA(0);
    setScoreB(0);
    setServing('A');
    setWinner(null);
  };

  useEffect(() => {
    if (winner) {
      Animated.sequence([
        Animated.timing(animation, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          delay: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => setWinner(null));
    }
  }, [winner, animation]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const renderTeamScore = (team: 'A' | 'B') => {
    const score = team === 'A' ? scoreA : scoreB;
    return (
      <View style={styles.teamContainer}>
        <Text style={styles.teamName}>Team {team}</Text>
        <Text style={styles.score}>{score}</Text>
        <View style={styles.buttonContainer}>
          <Button
            style={[styles.button, serving === team && styles.servingButton]}
            onPress={() => incrementScore(team)}>
            <Text style={styles.buttonText}>+1</Text>
          </Button>
          <Button
            style={[styles.button, styles.decrementButton]}
            onPress={() => decrementScore(team)}>
            <Text style={styles.buttonText}>-1</Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    // <SafeAreaProvider>
    //   <PaperProvider>
    <View style={styles.container}>
      <Text style={styles.title}>Badminton Scorer</Text>
      <View style={styles.scoreBoard}>
        {renderTeamScore('A')}
        {renderTeamScore('B')}
      </View>
      <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetButtonText}>Reset Scores</Text>
      </TouchableOpacity>
      {winner && (
        <Animated.View
          style={[
            styles.winnerOverlay,
            {
              opacity: animation,
              transform: [
                {
                  scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}>
          <Text style={styles.winnerText}>Team {winner} Wins!</Text>
          <Text style={styles.congratsText}>🎉 Congratulations! 🎉</Text>
        </Animated.View>
      )}
    </View>
    //   </PaperProvider>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  teamContainer: {
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  score: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.4,
  },
  button: {
    backgroundColor: colors.primary.light,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    width: width * 0.18,
    alignItems: 'center',
  },
  servingButton: {
    backgroundColor: colors.secondary.light,
  },
  decrementButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  winnerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  congratsText: {
    color: 'white',
    fontSize: 24,
  },
});

export default App;
