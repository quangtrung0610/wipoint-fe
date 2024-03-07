export class ShopDto {
  id: number = 0;
  companyName: string = '';
  taxCode: string = '';
  email: string = '';
  phoneNumber: string = '';
  fax: string = '';
  website: string = '';
  provinceName: string = '';
  districtName: string = '';
  wardName: string = '';
  detailAddress: string = '';
  get address(): string {
    return `${this.detailAddress ? this.detailAddress : ''}${this.wardName ? ', ' + this.wardName : ''}${
      this.districtName ? ', ' + this.districtName : ''
    }${this.provinceName ? ', ' + this.provinceName : ''}`;
  }
  extraInfo: string = '';
  logoUrl?: string;
  logoThumbnails?: string[];

  constructor(_companyDto?: ShopDto) {
    this.id = _companyDto?.id!;
    this.companyName = _companyDto?.companyName || '';
    this.taxCode = _companyDto?.taxCode || '';
    this.email = _companyDto?.email || '';
    this.phoneNumber = _companyDto?.phoneNumber || '';
    this.fax = _companyDto?.fax || '';
    this.website = _companyDto?.website || '';
    this.provinceName = _companyDto?.provinceName || '';
    this.districtName = _companyDto?.districtName || '';
    this.wardName = _companyDto?.wardName || '';
    this.detailAddress = _companyDto?.detailAddress || '';
    this.extraInfo = _companyDto?.extraInfo || '';
    this.logoUrl = _companyDto?.logoUrl || '';
    this.logoThumbnails = _companyDto?.logoThumbnails!;
  }
}
