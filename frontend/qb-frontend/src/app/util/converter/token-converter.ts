import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {Token} from "../../db/entity/token";

export class TokenConverter {

  public static convertToEntityObject(data: Object) {
    return Object.assign(new Token(), data);
  }

}
