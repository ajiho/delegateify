export default {


    throw_Error(msg) {
        throw new Error(`Delegateify: ${msg}`);
    },

    contains(set, subSet) {
        for (let i = 0; i < subSet.length; i++) {
            if (set.indexOf(subSet[i]) === -1) {
                return false;
            }
        }
        return true;
    },

    contains2(set, subSet) {
        return subSet.every(item => set.includes(item));
    }

}