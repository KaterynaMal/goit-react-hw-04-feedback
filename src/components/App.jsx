import { useState } from 'react';

import { Statistics } from './Statistics';
import { FeedbackOptions } from './FeedbackOptions';
import { SectionTitle } from './SectionTitle';
import { Notification } from './Notification';

import css from './Feedback.module.css';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleClick = type => {
    setFeedback(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };

  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;

  const positivePercentage = total === 0 ? 0 : Math.round((good / total) * 100);

  return (
    <div className={css.feedback_container}>
      <SectionTitle title="Please leave feedback">
        <FeedbackOptions
          onLeaveFeedback={handleClick}
          options={['good', 'neutral', 'bad']}
        />
      </SectionTitle>
      <SectionTitle title="Feedback Statistics">
        {total === 0 ? (
          <Notification message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        )}
      </SectionTitle>
    </div>
  );
};
