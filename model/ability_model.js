import {entityProperty} from "swagger-decorator";

export default class AbilityModel {
    // 编号
    @entityProperty({
        type: "integer",
        description: "user id, auto-generated",
        required: false
    })
    id: string = 0;
    name;
    content;
    sort;
    isShow;
}