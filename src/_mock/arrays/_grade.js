import _mock from '../_mock';
import { randomNumberRange, randomInArray } from '../utils';
import {any} from "prop-types";

// ----------------------------------------------------------------------


export const _gradeList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  levelId: _mock.id(index),
  name: _mock.name.fullName(index),
  description: _mock.text.description(index),
}));


