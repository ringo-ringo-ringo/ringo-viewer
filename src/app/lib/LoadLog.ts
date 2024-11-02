const { LogProto } = require("./RCRSLogProto_pb");

export class LoadLog {
    constructor() {}
    load(path: any, file: string): Promise<JSON> {
        return new Promise((resolve, reject) => {
            const filePath = path + "/" + file;
            const host = process.env.NEXT_PUBLIC_LOG_HOST;

            const fetchUrl = new URL(filePath, host).href;
            console.log(fetchUrl);

            fetch(fetchUrl)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("fetch faild");
                    }
                    return res.arrayBuffer();
                })
                .then((buf) => {
                    const decodedLog = LogProto.deserializeBinary(buf);

                    const jsonString = JSON.stringify(decodedLog.toObject(), null, 2);
                    // console.log(jsonString);

                    const json = JSON.parse(jsonString);

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}
