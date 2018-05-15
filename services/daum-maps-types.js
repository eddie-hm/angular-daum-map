/**
 * Identifiers used to specify the placement of controls on the map. Controls are
 * positioned relative to other controls in the same layout position. Controls that
 * are added first are positioned closer to the edge of the map.
 */
export var ControlPosition;
(function (ControlPosition) {
    ControlPosition[ControlPosition["BOTTOM"] = 0] = "BOTTOM";
    ControlPosition[ControlPosition["BOTTOM_LEFT"] = 1] = "BOTTOM_LEFT";
    ControlPosition[ControlPosition["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    ControlPosition[ControlPosition["LEFT"] = 3] = "LEFT";
    ControlPosition[ControlPosition["RIGHT"] = 4] = "RIGHT";
    ControlPosition[ControlPosition["TOP"] = 5] = "TOP";
    ControlPosition[ControlPosition["TOP_LEFT"] = 6] = "TOP_LEFT";
    ControlPosition[ControlPosition["TOP_RIGHT"] = 7] = "TOP_RIGHT";
})(ControlPosition || (ControlPosition = {}));
export var MapTypeControlStyle;
(function (MapTypeControlStyle) {
    MapTypeControlStyle[MapTypeControlStyle["DEFAULT"] = 0] = "DEFAULT";
    MapTypeControlStyle[MapTypeControlStyle["DROPDOWN_MENU"] = 1] = "DROPDOWN_MENU";
    MapTypeControlStyle[MapTypeControlStyle["HORIZONTAL_BAR"] = 2] = "HORIZONTAL_BAR";
})(MapTypeControlStyle || (MapTypeControlStyle = {}));
export var ScaleControlStyle;
(function (ScaleControlStyle) {
    ScaleControlStyle[ScaleControlStyle["DEFAULT"] = 0] = "DEFAULT";
})(ScaleControlStyle || (ScaleControlStyle = {}));
export var ZoomControlStyle;
(function (ZoomControlStyle) {
    ZoomControlStyle[ZoomControlStyle["DEFAULT"] = 0] = "DEFAULT";
    ZoomControlStyle[ZoomControlStyle["LARGE"] = 1] = "LARGE";
    ZoomControlStyle[ZoomControlStyle["SMALL"] = 2] = "SMALL";
})(ZoomControlStyle || (ZoomControlStyle = {}));
export var ProjectionId;
(function (ProjectionId) {
    /**
    * 투영 없는 API 내부의 좌표계 자체.
    * left-bottom을 (0,0)으로 하는 픽셀단위의 좌표계.
    */
    ProjectionId[ProjectionId["NONE"] = 0] = "NONE";
    /**
    * API 내부 좌표계를 WCongnamul좌표계로 투영.
    * 외부에서 WCongnamul 좌표를 받아 사용가능.
    */
    ProjectionId[ProjectionId["WCONG"] = 1] = "WCONG";
})(ProjectionId || (ProjectionId = {}));
//copyright의 위치가 상수값으로 정의되어 있다.
export var CopyrightPosition;
(function (CopyrightPosition) {
    //왼쪽아래
    CopyrightPosition[CopyrightPosition["BOTTOMLEFT"] = 0] = "BOTTOMLEFT";
    //오른쪽아래
    CopyrightPosition[CopyrightPosition["BOTTOMRIGHT"] = 1] = "BOTTOMRIGHT";
})(CopyrightPosition || (CopyrightPosition = {}));
export var MapTypeId;
(function (MapTypeId) {
    /** This map type displays a transparent layer of major streets on satellite images. */
    MapTypeId[MapTypeId["ROADMAP"] = 0] = "ROADMAP";
    /** This map type displays a normal street map. */
    MapTypeId[MapTypeId["SKYVIEW"] = 1] = "SKYVIEW";
    /** This map type displays satellite images. */
    MapTypeId[MapTypeId["HYBRID"] = 2] = "HYBRID";
    /** This map type displays maps with physical features such as terrain and vegetation. */
    MapTypeId[MapTypeId["ROADVIEW"] = 3] = "ROADVIEW";
    MapTypeId[MapTypeId["OVERLAY"] = 4] = "OVERLAY";
    MapTypeId[MapTypeId["TRAFFIC"] = 5] = "TRAFFIC";
    MapTypeId[MapTypeId["TERRAIN"] = 6] = "TERRAIN";
    MapTypeId[MapTypeId["BICYCLE"] = 7] = "BICYCLE";
    MapTypeId[MapTypeId["BICYCLE_HYBRID"] = 8] = "BICYCLE_HYBRID";
    MapTypeId[MapTypeId["USE_DISTRICT"] = 9] = "USE_DISTRICT";
})(MapTypeId || (MapTypeId = {}));
//# sourceMappingURL=daum-maps-types.js.map
