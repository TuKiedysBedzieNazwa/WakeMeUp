import { Appearance } from "react-native";
import { getRealmObj } from "../database/database";

const themeCheck = () => {

    let options = getRealmObj("options")[0]

    if(options.string == 'device'){
        return Appearance.getColorScheme();
    }

    return options.string;
}

export default themeCheck;