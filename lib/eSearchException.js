"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ESearchException extends Error {
    constructor(errno, msg) {
        super(msg);
        this.errno = errno;
        this.msg = msg;
    }
}
exports.ESearchException = ESearchException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZVNlYXJjaEV4Y2VwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVTZWFyY2hFeGNlcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLGdCQUFpQixTQUFRLEtBQUs7SUFHekMsWUFBWSxLQUFLLEVBQUUsR0FBRztRQUNwQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFSRCw0Q0FRQyJ9