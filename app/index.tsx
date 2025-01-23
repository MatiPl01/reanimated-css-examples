import { useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, { css } from 'react-native-reanimated';

const SWITCH_WIDTH = 250;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function App(): React.JSX.Element {
  const [selected, setSelected] = useState(false);

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: selected ? 'black' : 'white' }
      ]}>
      <View style={styles.contentContainer}>
        <Text style={[styles.text, styles.textDay]}>Day</Text>
        <Switch selected={selected} onValueChange={setSelected} />
        <Text style={styles.text}>Night</Text>
      </View>
    </Animated.View>
  );
}

type SwitchProps = {
  selected: boolean;
  onValueChange: (value: boolean) => void;
};

function Switch({ onValueChange, selected }: SwitchProps) {
  const craterStyle = [styles.crater, { opacity: selected ? 0.4 : 0 }];
  const shapeStyle = [
    styles.shape,
    { backgroundColor: selected ? 'lightgray' : 'whitesmoke' }
  ];
  const borderColor = Platform.select({
    android: selected ? 'rgba(102, 51, 153, 0.5)' : 'rgba(135, 206, 235, 0.5)',
    default: selected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'
  });

  return (
    <AnimatedPressable
      style={[
        styles.switch,
        {
          backgroundColor: selected ? 'rebeccapurple' : 'skyblue',
          borderColor
        }
      ]}
      onPress={() => onValueChange(!selected)}>
      {/* Switch thumb */}
      <Animated.View
        style={[
          styles.thumb,
          selected
            ? {
                backgroundColor: 'whitesmoke',
                left: '100%',
                transform: [{ translateX: '-100%' }]
              }
            : {
                backgroundColor: '#ffe030',
                left: 0
              }
        ]}>
        {/* Craters are shown on the moon, when the switch is selected */}
        <Animated.View style={[craterStyle, styles.crater1]} />
        <Animated.View style={[craterStyle, styles.crater2]} />
      </Animated.View>

      {/* Shapes represent clouds or stars */}
      <Animated.View
        style={[
          shapeStyle,
          styles.shape1,
          !selected && {
            shadowOpacity: 0,
            transform: [{ translateX: 0.02 * SWITCH_WIDTH }, { scaleX: 5 }]
          }
        ]}
      />
      <Animated.View
        style={[
          shapeStyle,
          styles.shape2,
          !selected && {
            opacity: 0,
            shadowOpacity: 0,
            transform: [{ translateX: 0.3 * SWITCH_WIDTH }]
          }
        ]}
      />
      <Animated.View
        style={[
          shapeStyle,
          styles.shape3,
          !selected && {
            shadowOpacity: 0,
            transform: [
              { translateX: 0.45 * SWITCH_WIDTH },
              { translateY: 0.06 * SWITCH_WIDTH },
              { scaleX: 6 },
              { scaleY: 1.5 }
            ]
          }
        ]}
      />
      <Animated.View
        style={[
          shapeStyle,
          styles.shape4,
          !selected && {
            shadowOpacity: 0,
            transform: [{ translateX: 0.06 * SWITCH_WIDTH }, { scaleX: 6 }]
          }
        ]}
      />
    </AnimatedPressable>
  );
}

const styles = css.create({
  container: {
    flex: 1,
    transitionDuration: 300,
    transitionProperty: 'backgroundColor',
    transitionTimingFunction: 'easeInOut'
  },
  contentContainer: {
    alignItems: 'center',
    height: '70%',
    justifyContent: 'space-evenly'
  },
  crater: {
    aspectRatio: 1,
    backgroundColor: 'burlywood',
    borderRadius: '50%',
    opacity: 0.5,
    position: 'absolute',
    transitionDuration: 300,
    transitionProperty: 'opacity',
    transitionTimingFunction: 'easeInOut'
  },
  crater1: {
    left: '10%',
    top: '10%',
    transform: [{ rotate: '-45deg' }, { scaleY: 0.65 }],
    width: '30%'
  },
  crater2: {
    right: '10%',
    top: '10%',
    transform: [{ rotate: '45deg' }, { scaleY: 0.65 }],
    width: '22%'
  },
  shape: {
    aspectRatio: 1,
    borderRadius: '50%',
    elevation: 10,
    position: 'absolute',
    shadowColor: 'whitesmoke',
    shadowOpacity: 1,
    shadowRadius: 0.05 * SWITCH_WIDTH,
    transformOrigin: 'left',
    transitionDuration: 300,
    transitionTimingFunction: 'easeInOut',
    zIndex: -1
  },
  shape1: {
    left: '30%',
    top: '20%',
    width: '7%',
    zIndex: 0
  },
  shape2: {
    left: '45%',
    top: '60%',
    width: '4%'
  },
  shape3: {
    left: '15%',
    top: '40%',
    width: '4%'
  },
  shape4: {
    bottom: '10%',
    left: '20%',
    width: '9%'
  },
  switch: {
    backgroundColor: 'white',
    borderRadius: 9999,
    borderWidth: 0.04 * SWITCH_WIDTH,
    height: SWITCH_WIDTH / 2,
    padding: 0.03 * SWITCH_WIDTH,
    position: 'relative',
    transitionDuration: [300, 200],
    transitionProperty: ['backgroundColor', 'borderColor'],
    width: SWITCH_WIDTH
  },
  text: {
    color: 'white',
    fontSize: 80,
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  textDay: {
    color: 'black'
  },
  thumb: {
    borderRadius: 9999,
    boxShadow: '0 0 10 whitesmoke',
    height: 0.36 * SWITCH_WIDTH,
    position: 'relative',
    transitionDuration: 300,
    transitionTimingFunction: 'easeInOut',
    width: 0.36 * SWITCH_WIDTH
  }
});
