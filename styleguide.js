// styleguide/setup.js
import "./src/style.global.css";

import Text from "./src/components/Text/Text";
import VideoListing from "./src/components/VideoListing/VideoListing";

import Modal from "./src/modules/Modal/Modal";
import Popover from "./src/modules/Popover/Popover";
import ContextMenu from "./src/modules/ContextMenu/ContextMenu";

global.Text = Text;
global.VideoListing = VideoListing;

global.Modal = Modal;
global.Popover = Popover;
global.ContextMenu = ContextMenu;