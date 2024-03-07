
export class CoreUserInitDTO {
  id: number = 0;
  userCode: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  email?: string = '';
  gender?: any;
  avatarUrl: string = '';
  thumbnails: string[] = [];
  detailAddress?: string = '';
  districtCode?: string = '';
  districtName?: string = '';
  provinceCode?: string = '';
  provinceName?: string = '';
  wardCode?: string = '';
  wardName?: string = '';
  storeId: number = 0;
  dobDay?: number;
  dobMonth?: number;
  dobYear?: number;

  constructor(data?: CoreUserInitDTO) {
    this.id = data?.id!;
    this.userCode = data?.userCode!;
    this.fullName = data?.fullName!;
    this.phoneNumber = data?.phoneNumber!;
    this.email = data?.email!;
    this.gender = data?.gender!;
    this.avatarUrl = data?.avatarUrl || '';
    this.thumbnails = data?.thumbnails!;
    this.provinceCode = data?.provinceCode || '';
    this.provinceName = data?.provinceName || '';
    this.districtCode = data?.districtCode || '';
    this.districtName = data?.districtName || '';
    this.wardCode = data?.wardCode || '';
    this.wardName = data?.wardName || '';
    this.detailAddress = data?.detailAddress || '';
    this.storeId = data?.storeId || 0;
    this.dobDay = data?.dobDay || 0;
    this.dobMonth = data?.dobMonth || 0;
    this.dobYear = data?.dobYear || 0;
  }

  get birthday(): Date | undefined {
    return this.dobYear && this.dobMonth && this.dobDay
      ? new Date(this.dobYear, this.dobMonth - 1, this.dobDay)
      : undefined;
  }
  get address(): string {
    return `${this.detailAddress ? ', ' + this.detailAddress : ''}, ${this.wardName ? ', ' + this.wardName : ''}, ${
      this.districtName ? ', ' + this.districtName : ''
    }  ${this.provinceName ? ', ' + this.provinceName : ''}`;
  }
}
