import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  LabelResult,
  CardResult,
  TextNomal,
  TextNumber,
  TextBMI,
  DescriptionResult
} from './styles';

import { Button, ButtonLabel } from '../../components/styles';
import {
  Image,
  ScrollView,
  Text,
  Platform,
  View,
  Dimensions
} from 'react-native';
export default function Result({ navigation }) {
  const result = navigation.getParam('result');
  const data = navigation.getParam('data');
  return (
    <>
      <Container>
      <ScrollView>
        <LabelResult>Result</LabelResult>

        <CardResult>
          <TextNomal>{result.diagnostic}</TextNomal>
          <TextNumber>{result.calc}</TextNumber>
          <DescriptionResult>{result.description}</DescriptionResult>
        </CardResult>
        <Button onPress={() => navigation.navigate('Bmi', { data })}>
          <ButtonLabel>Try Again</ButtonLabel>
        </Button>
          </ScrollView>
      </Container>

    </>
  );
}

Result.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func
  }).isRequired
};
