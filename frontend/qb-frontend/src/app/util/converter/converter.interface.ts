export interface Converter<E, R> {

  toEntityObject(data: R): E;

  toRestObject(data: E): R;
}
