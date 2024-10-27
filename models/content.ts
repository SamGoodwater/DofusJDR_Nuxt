export class Content {
  static readonly DATE_DB = "Y-m-d";
  static readonly DATE_TIME_DB = "Y-m-d H:i:s";
  static readonly DATE_FR = "d-m-Y";
  static readonly TIME_FR = "H:i:s";
  static readonly DATE_TIME_FR = "H:i:s d-m-Y";

  static readonly PATH_FILE_GENERAL_DEFAULT = "medias/no_file_found_logo.svg";

  protected id: number = 0;
  protected uniqid: string = '';
  protected created_at: Date = new Date();
  protected updated_at: Date | null = null;
  protected usable: boolean = false;
  protected files: Record<string, File | File[]> = {};

  constructor(data: Partial<Content> = {}) {
      this.hydrate(data);
  }

  protected hydrate(data: Partial<Content>): void {
      if (data === null) { return; }
      for (const key in data) {
          if (key in this) {
              (this as any)[key] = (data as Record<string, any>)[key];
          }
      }
  }
}