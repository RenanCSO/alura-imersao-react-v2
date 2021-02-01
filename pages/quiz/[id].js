/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage({ externalDB }) {
  return (
    <ThemeProvider theme={externalDB.theme}>
      <QuizScreen
        externalQuestions={externalDB.questions}
        bg={externalDB.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  try {
    const externalDB = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
      .then((serverResponse) => {
        if (serverResponse.ok) {
          return serverResponse.json();
        }
        throw new Error('Error to access data');
      })
      .then((responseObject) => responseObject);
    return {
      props: { // will be passed to the page component as props
        externalDB,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
