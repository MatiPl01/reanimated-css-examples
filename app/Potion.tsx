import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { css } from 'react-native-reanimated';

const VIAL_SIZE = 250;

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Animated.View style={styles.vailShadow} />
        <Animated.View style={styles.vial}>
          <Animated.View style={styles.potion}>
            <Animated.View style={styles.potionLayer}>
              <View style={styles.potionLayerOverlay} />
            </Animated.View>
          </Animated.View>
          <Bubbles />
          <View style={styles.vialMouth} />
          <View style={styles.vialShine} />
        </Animated.View>
      </View>
    </View>
  );
}

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

let nextId = 0;

function Bubbles() {
  const startTimestampRef = useRef(Date.now());
  const [bubbles, setBubbles] = useState<
    Array<{ id: number; duration: number; delay: number }>
  >([]);

  useEffect(() => {
    startTimestampRef.current = Date.now();
    setBubbles([]);

    const interval = setInterval(() => {
      setBubbles(prev => [
        ...prev,
        {
          delay: Date.now() - startTimestampRef.current,
          duration: randInt(2500, 3500),
          id: nextId++
        }
      ]);
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handleRemove = useCallback((removeId: number) => {
    setBubbles(prev => prev.filter(b => b.id !== removeId));
  }, []);

  return (
    <View style={styles.bubbles}>
      {bubbles.map(({ delay, duration, id }) => (
        <Bubble
          delay={delay}
          duration={duration}
          id={id}
          key={id}
          onRemove={handleRemove}
        />
      ))}
    </View>
  );
}

type BubbleProps = {
  id: number;
  onRemove: (id: number) => void;
  duration: number;
  delay: number;
};

const Bubble = memo(function Bubble({
  delay,
  duration,
  id,
  onRemove
}: BubbleProps) {
  const size = randInt(5, 12);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onRemove(id);
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, id, onRemove]);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          animationDelay: [-delay, 0],
          animationDuration: ['9s', duration],
          animationFillMode: 'forwards',
          animationIterationCount: ['infinite', 1],
          animationName: [
            potionColor,
            {
              '0%': {
                height: (size / 3) * 2.5,
                left: `${randInt(10, 80)}%`,
                top: (randInt(80, 100) * VIAL_SIZE) / 100 - 80,
                width: (size / 3) * 2.5
              },
              '50%': {
                height: size * 2.5,
                left: `${randInt(20, 80)}%`,
                top: 0.45 * VIAL_SIZE - 30,
                width: size * 2.5
              },
              '90%': {
                opacity: 1
              },
              '100%': {
                height: (size / 2) * 2.5,
                left: `${randInt(45, 55)}%`,
                opacity: 0,
                top: '-1%',
                width: (size / 2) * 2.5
              }
            }
          ]
        }
      ]}
    />
  );
});

const vialRotate = css.keyframes({
  '0%, 50%, 100%': {
    animationTimingFunction: 'easeOut',
    transform: 'rotate(0deg)'
  },
  '25%': {
    animationTimingFunction: 'easeIn',
    transform: 'rotate(15deg)'
  },
  '75%': {
    animationTimingFunction: 'easeIn',
    transform: 'rotate(-15deg)'
  }
});

const potionRotate = css.keyframes({
  '0%, 50%, 100%': {
    animationTimingFunction: 'easeOut',
    transform: [{ rotate: '0deg' }]
  },
  '25%': {
    animationTimingFunction: 'easeIn',
    transform: [{ rotate: '-20deg' }]
  },
  '75%': {
    animationTimingFunction: 'easeIn',
    transform: [{ rotate: '20deg' }]
  }
});

const potionColor = css.keyframes({
  '0%': {
    backgroundColor: '#41c1fb',
    shadowColor: '#41c1fb'
  },
  '20%': {
    backgroundColor: '#41fb7f',
    shadowColor: '#41fb7f'
  },
  '40%': {
    backgroundColor: '#fbdb41',
    shadowColor: '#fbdb41'
  },
  '60%': {
    backgroundColor: '#fb4141',
    shadowColor: '#fb4141'
  },
  '80%': {
    backgroundColor: '#c141fb',
    shadowColor: '#c141fb'
  },
  '100%': {
    backgroundColor: '#41c1fb',
    shadowColor: '#41c1fb'
  }
});

const vialShadow = css.keyframes({
  '0%, 50%, 100%': {
    animationTimingFunction: 'easeOut',
    left: 0,
    transform: 'scaleY(.15) scaleX(.9)'
  },
  '25%': {
    animationTimingFunction: 'easeIn',
    left: 0.15 * VIAL_SIZE,
    transform: 'scaleY(.2)'
  },
  '75%': {
    animationTimingFunction: 'easeIn',
    left: -0.15 * VIAL_SIZE,
    transform: 'scaleY(.2)'
  }
});

const styles = css.create({
  bubble: {
    backgroundColor: 'red',
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    borderTopWidth: 1,
    borderWidth: 1,
    position: 'absolute'
  },
  bubbles: {
    borderRadius: '50%',
    height: VIAL_SIZE - 10,
    inset: 5,
    position: 'absolute',
    width: VIAL_SIZE - 10
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#111',
    flex: 1,
    justifyContent: 'center'
  },
  potion: {
    animationDuration: ['3s', '9s'],
    animationIterationCount: 'infinite',
    animationName: [potionRotate, potionColor],
    animationTimingFunction: 'linear',
    backgroundColor: '#41c1fb',
    borderBottomLeftRadius: VIAL_SIZE / 2,
    borderBottomRightRadius: VIAL_SIZE / 2,
    bottom: 5,
    left: 5,
    position: 'absolute',
    right: 5,
    shadowOpacity: 1,
    shadowRadius: 100,
    top: '50%',
    transformOrigin: 'top center'
  },
  potionLayer: {
    animationDuration: '9s',
    animationIterationCount: 'infinite',
    animationName: potionColor,
    animationTimingFunction: 'linear',
    aspectRatio: 1,
    backgroundColor: 'red',
    borderRadius: '50%',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    transform: 'translateY(-110%) scaleY(.2)',
    width: '100%'
  },
  potionLayerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  vailShadow: {
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationName: vialShadow,
    aspectRatio: 1,
    backgroundColor: 'rgba(0, 0, 0, .75)',
    borderRadius: '50%',
    position: 'absolute',
    top: '57.5%',
    transform: 'scaleY(.2)',
    width: 0.9 * VIAL_SIZE
  },
  vial: {
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    animationName: vialRotate,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'transparent',
    borderRadius: '100%',
    borderWidth: 8,
    height: VIAL_SIZE,
    transformOrigin: 'bottom center',
    width: VIAL_SIZE
  },
  vialMouth: {
    borderColor: '#444',
    // Android doesn't render % border radius properly
    borderRadius: Platform.OS === 'android' ? 9999 : '50%',
    borderWidth: 10,
    boxShadow: '0 10px #222',
    height: 30,
    left: '50%',
    position: 'absolute',
    top: -15,
    transform: 'translateX(-50%)',
    width: '40%'
  },
  vialShine: {
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50%',
    left: '50%',
    position: 'absolute',
    top: '40%',
    transform: 'translate(-50%, -50%) scaleY(.6)',
    width: VIAL_SIZE / 2
  }
});
