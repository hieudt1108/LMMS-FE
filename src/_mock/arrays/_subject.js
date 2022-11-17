import _mock from '../_mock';

// ----------------------------------------------------------------------


export const _subjectList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  code: String,
  name: String,
  description: String,
}));


