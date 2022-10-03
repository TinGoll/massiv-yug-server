import { ProfileDto } from "../../types/dtos/profile-dto/profile-dto";

export class Profile {
  name: string;

  profileWidth: number | null;
  profileWidthMini: number | null;

  depth: number | null;
  assemblyAngle: 90 | 45 | null;
  grooveThickness: number | null;
  grooveDepth: number | null;
  chamferSize: number | null;
  tenonSize: number | null;
  bottomShelfThickness: number | null;
  constructor(name: string, dto?: Partial<ProfileDto>) {
    this.name = name;
    this.update(dto);
  }

  set(dto: ProfileDto): this {
    if (!dto) return this;
    this.name = dto.name;
    this.profileWidth = dto.profileWidth;
    this.profileWidthMini = dto.profileWidthMini;
    this.depth = dto.depth;
    this.assemblyAngle = dto.assemblyAngle;
    this.grooveThickness = dto.grooveThickness;
    this.grooveDepth = dto.grooveDepth;
    this.chamferSize = dto.chamferSize;
    this.tenonSize = dto.tenonSize;
    this.bottomShelfThickness = dto.bottomShelfThickness;
    return this;
  }

  update(dto: Partial<ProfileDto>): this {
    if (!dto) return this;
    if (typeof dto.name !== "undefined") this.name = dto.name;
    if (typeof dto.profileWidth !== "undefined")
      this.profileWidth = dto.profileWidth;
    if (typeof dto.profileWidthMini !== "undefined")
      this.profileWidthMini = dto.profileWidthMini;
    if (typeof dto.depth !== "undefined") this.depth = dto.depth;
    if (typeof dto.assemblyAngle !== "undefined")
      this.assemblyAngle = dto.assemblyAngle;
    if (typeof dto.grooveThickness !== "undefined")
      this.grooveThickness = dto.grooveThickness;
    if (typeof dto.grooveDepth !== "undefined")
      this.grooveDepth = dto.grooveDepth;
    if (typeof dto.chamferSize !== "undefined")
      this.chamferSize = dto.chamferSize;
    if (typeof dto.tenonSize !== "undefined") this.tenonSize = dto.tenonSize;
    if (typeof dto.bottomShelfThickness !== "undefined")
      this.bottomShelfThickness = dto.bottomShelfThickness;
    return this;
  }

  public static create(dto: ProfileDto): Profile {
    return new Profile(dto.name).update(dto);
  }
}
