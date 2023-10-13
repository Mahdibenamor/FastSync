enum SyncOperationEnum {
  add(0),
  update(1),
  delete(2);

  const SyncOperationEnum(this.code);
  final int code;
}
