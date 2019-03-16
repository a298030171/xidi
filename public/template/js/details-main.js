import "../libs/jquery-1.12.4.js";
import "../libs/jquery.cookie.js";

import {Getdata} from "./details-loaddata.js";
import { Addcar } from "./details-addcar.js";
import {Nav} from "./index-nav.js";
import { Islogin } from "./Islogin.js";
import {Tocar} from "./tocar.js";

new Getdata();
new Addcar();
new Nav();
new Islogin()
new Tocar();