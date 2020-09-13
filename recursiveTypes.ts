

type nonRecurseReadOnly<T> = { readonly [P in keyof T]: T[P] };

type Shape = {
  color: string;
  configuration: {
    height: number;
    width: number;
  }
};

const canBeModifiedDeeply: nonRecurseReadOnly<Shape> = {
  color: 'green',
  configuration: {
    //without recrusive read only we could modify these props
    height: 100,
    width: 100,
  }
};

//this could sure be improved!
canBeModifiedDeeply.configuration.height = 122;

//recursive type to make read only!
//https://dev.to/busypeoples/notes-on-typescript-recursive-types-and-immutability-5ck1
type MakeReadOnly<Type> = {
  readonly [Key in keyof Type]: MakeReadOnly<Type[Key]>;
};

const shape: MakeReadOnly<Shape> = {
  color: 'green',
  configuration: {
    //without recrusive read only we could modify these props
    height: 100,
    width: 100,
  }
};
