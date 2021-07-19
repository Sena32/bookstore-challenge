import { all, takeLatest } from 'redux-saga/effects';

import { BooksTypes } from './books/types';
import { createBook, deleteBook, load, updateBook } from './books/sagas';

export default function* rootSaga() {
  return yield all([
    takeLatest(BooksTypes.LOAD_REQUEST, load),
    takeLatest(BooksTypes.CREATE_REQUEST, createBook),
    takeLatest(BooksTypes.UPDATE_REQUEST, updateBook),
    takeLatest(BooksTypes.DELETE_REQUEST, deleteBook),
  ]);
}
