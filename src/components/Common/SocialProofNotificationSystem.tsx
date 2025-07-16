import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SocialProofNotification, generateNotificationContent } from './SocialProofNotification';

const PHASES = [
  { count: 10, min: 30_000, max: 50_000 },
  { count: 20, min: 60_000, max: 900_000 },
  { count: 50, min: 60_000, max: 18_000_000 },
];

function getRandomInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const TOTAL_NOTIFICATIONS = PHASES.reduce((sum, p) => sum + p.count, 0);
const EXIT_ANIMATION_DURATION = 600; // ms
const PAUSE_BETWEEN = 1200; // ms (pause after exit before next notification)
const VISIBLE_DURATION = 6000; // ms (notification visible time)

type AnimationState = 'entering' | 'exiting' | 'hidden' | 'visible';

const SocialProofNotificationSystem: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [timeAgo, setTimeAgo] = useState<string | undefined>(undefined);
  const [animationState, setAnimationState] = useState<AnimationState>('hidden');
  const [started, setStarted] = useState(false);
  const notificationIndex = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nextTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smart Start: Wait for user scroll or click
  useEffect(() => {
    if (started) return;
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollY / docHeight > 0.3) {
        setStarted(true);
      }
    };
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a,button')) {
        setStarted(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, [started]);

  // Start notification cycle after smart start
  useEffect(() => {
    if (!started) return;
    showNextNotification();
    // eslint-disable-next-line
  }, [started]);

  const showNextNotification = useCallback(() => {
    const notif = generateNotificationContent();
    setContent(notif.message);
    setTimeAgo(notif.timeAgo);
    setVisible(true);
    setAnimationState('entering');
    setTimeout(() => setAnimationState('visible'), 30); // allow entering animation
    // Hide after visible duration
    timeoutRef.current = setTimeout(() => {
      setAnimationState('exiting');
      setTimeout(() => {
        setAnimationState('hidden');
        setVisible(false);
        // Pause before next notification
        nextTimeoutRef.current = setTimeout(() => {
          notificationIndex.current++;
          if (notificationIndex.current >= TOTAL_NOTIFICATIONS) {
            notificationIndex.current = 0;
          }
          scheduleNext();
        }, PAUSE_BETWEEN);
      }, EXIT_ANIMATION_DURATION);
    }, VISIBLE_DURATION);
  }, []);

  const scheduleNext = useCallback(() => {
    let idx = notificationIndex.current;
    let phaseIdx = 0;
    let phaseStart = 0;
    for (let i = 0; i < PHASES.length; i++) {
      if (idx < phaseStart + PHASES[i].count) {
        phaseIdx = i;
        break;
      }
      phaseStart += PHASES[i].count;
    }
    const phase = PHASES[phaseIdx];
    const interval = getRandomInterval(phase.min, phase.max);
    timeoutRef.current = setTimeout(() => {
      showNextNotification();
    }, interval);
  }, [showNextNotification]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
    };
  }, []);

  return (
    <SocialProofNotification
      visible={visible}
      content={content}
      animationState={animationState}
      timeAgo={timeAgo}
    />
  );
};

export default SocialProofNotificationSystem; 