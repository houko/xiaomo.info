import {entityProperty} from "swagger-decorator";

export default class SelfIntroduceModel {
    // 编号
    @entityProperty({
        type: "integer",
        description: "user id, auto-generated",
        required: false
    })
    id: string = 0;
    // 姓名
    @entityProperty({
        type: "string",
        description: "user name, 3~12 characters",
        required: true
    })
    name: string = "name";
    content;
    sort;
    isShow;
}