import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SocialProofNotification, generateNotificationContent } from './SocialProofNotification';

// Remove PHASES and TOTAL_NOTIFICATIONS
// Use a fixed interval for notifications
const MIN_INTERVAL = 14000; // 14 seconds
const MAX_INTERVAL = 20000; // 20 seconds

function getRandomInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const EXIT_ANIMATION_DURATION = 600; // ms
const PAUSE_BETWEEN = 1200; // ms (pause after exit before next notification)
const VISIBLE_DURATION = 6000; // ms (notification visible time)

type AnimationState = 'entering' | 'exiting' | 'hidden' | 'visible';

const SocialProofNotificationSystem: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState('');
  const [timeAgo, setTimeAgo] = useState<string | undefined>(undefined);
  const [animationState, setAnimationState] = useState<AnimationState>('hidden');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const nextTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [manuallyClosed, setManuallyClosed] = useState(false);

  // Start notification cycle immediately on mount
  useEffect(() => {
    if (!manuallyClosed) showNextNotification();
    // eslint-disable-next-line
  }, [manuallyClosed]);

  const showNextNotification = useCallback(() => {
    setManuallyClosed(false);
    const notif = generateNotificationContent();
    setContent(notif.message);
    setTimeAgo(notif.timeAgo);
    setVisible(true);
    setAnimationState('entering');
    setTimeout(() => setAnimationState('visible'), 30); // allow entering animation
    // Hide after visible duration
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!isHovered) {
        setAnimationState('exiting');
        setTimeout(() => {
          setAnimationState('hidden');
          setVisible(false);
          // Pause before next notification
          nextTimeoutRef.current = setTimeout(() => {
            scheduleNext();
          }, PAUSE_BETWEEN);
        }, EXIT_ANIMATION_DURATION);
      }
    }, VISIBLE_DURATION);
  }, [isHovered]);

  // If hover state changes, pause/resume timer
  useEffect(() => {
    if (isHovered && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    } else if (!isHovered && visible && animationState === 'visible') {
      timeoutRef.current = setTimeout(() => {
        setAnimationState('exiting');
        setTimeout(() => {
          setAnimationState('hidden');
          setVisible(false);
          nextTimeoutRef.current = setTimeout(() => {
            scheduleNext();
          }, PAUSE_BETWEEN);
        }, EXIT_ANIMATION_DURATION);
      }, VISIBLE_DURATION);
    }
    // eslint-disable-next-line
  }, [isHovered]);

  // Close handler
  const handleClose = () => {
    setManuallyClosed(true);
    setVisible(false);
    setAnimationState('hidden');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
    // Next notification will show as normal after interval
    nextTimeoutRef.current = setTimeout(() => {
      setManuallyClosed(false);
      scheduleNext();
    }, PAUSE_BETWEEN);
  };

  const scheduleNext = useCallback(() => {
    const interval = getRandomInterval(MIN_INTERVAL, MAX_INTERVAL);
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
      isHovered={isHovered}
      onHover={setIsHovered}
      onClose={handleClose}
    />
  );
};

export default SocialProofNotificationSystem; 