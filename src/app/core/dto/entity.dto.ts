export class EntityDto {
  id: number = 0;
  code: string = '';
  name: string = '';
  creationTime: Date = new Date();
  lastModificationTime?: Date;

  constructor(data?: EntityDto) {
    this.id = data?.id ?? 0;
    this.code = data?.code ?? '';
    this.name = data?.name ?? '';
    this.creationTime = data?.creationTime ? new Date(data?.creationTime) : new Date();
    this.lastModificationTime = data?.lastModificationTime ? new Date(data?.lastModificationTime) : undefined;
  }
}
