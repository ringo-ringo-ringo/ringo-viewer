// created by gemeni
export class BitStreamReader {
    stream;
    index;
    dataView;

    constructor(stream: any) {
        this.stream = new Uint8Array(stream); // Uint8Arrayに変換
        this.index = 0;
        this.dataView = new DataView(this.stream.buffer); // DataViewを使用
    }

    getBits(len: number) {
        if (this.stream.length * 8 < this.index + len) {
            throw new Error("ArrayIndexOutOfBoundsException");
        }

        let val = 0;
        for (let i = 0; i < len; i++) {
            const num = (this.stream[Math.floor(this.index / 8)] >>> (7 - (this.index % 8))) & 0x1;
            val = (val << 1) | num;
            this.index++;
        }
        return val;
    }

    writeBack(len: number) {
        this.index -= len;
    }

    writeForward(len: number) {
        this.index += len;
    }

    getIndex() {
        return this.index;
    }

    getRemainBuffer() {
        return this.stream.length * 8 - this.index;
    }
}
