import bcrypt from 'bcryptjs';

import type { DataBaseType } from '~/types/types';

export class User {
  
     id: number = 0;
     uniqid: string = '';
     token: string|null = '';
     email: string = '';
     pseudo: string = 'Invité';
     hash: string = '';
     role: 'user'|'moderator'|'admin'| null = 'user';
     created_at: Date = new Date();
     updated_at: Date = new Date();;
     avatar: string | null = '';
     bookmark: any[] = [];
  
    constructor(data: DataBaseType) {

      if (data && typeof data === 'object' && 'password' in data) {
        this.hydrate(data);
        this.hash = this.hashPassword(data.password);
      } else {
        this.hydrate(data);
      }
      // const filesConfig: Record<string, FileConfig> = (this.constructor as any).FILES || {};
  
      // for (const [name, config] of Object.entries(filesConfig)) {
      //   if (config.naming && config.dir && config.type && config.default) {
      //     let path = FileManager.formatPath(config.dir);
      //     path += FileManager.solveNameFromPatternAndObject(this, config.naming);
      //     const isDir = config.is_dir || false;
  
      //     // Handle directories and files
      //     if (isDir) {
      //       path = FileManager.formatPath(path);
      //       this._files[name] = this.loadFilesFromDirectory(path, config.default, config.default_editable);
      //     } else {
      //       path = this.loadSingleFile(path, config.preferential_format, config.type, config.default, config.default_editable);
      //       this._files[name] = new File(path);
      //     }
      //   }
      // }
    }

    private hydrate(data: DataBaseType): void {
      if (data === null) {return;}
      for (const key in data) {
        if (key in this) {
          (this as any)[key] = (data as Record<string, any>)[key];
        }
      }
    }

    private hashPassword(password: string): string {
      return bcrypt.hashSync(password, 10);
    }
  
    // A refaire
    setBookmark(obj: any, action: 'add' | 'remove' = 'add'): boolean {
      const name = `${obj.constructor.name}-${obj.getUniqid()}`;
      if (action === 'add') {
        this.bookmark.push(obj);
      } else if (action === 'remove') {
        this.bookmark = this.bookmark.filter(bookmark => bookmark.getUniqid() !== obj.getUniqid());
      }
      return true;
    }
}