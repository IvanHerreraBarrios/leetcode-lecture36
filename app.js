var NumArray = function(nums) {
    this.root = new TreeNode(nums, 0, nums.length - 1)
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(index, val) {
    this.root.update(index, val)
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    return this.root.getSumRange(left, right)
};

function TreeNode(nums, from, to){
    this.from = from
    this.to = to
    this.sum = nums.reduce((sum, e) => sum += e, 0)

    if(nums.length > 1){
        const middle = Math.floor(nums.length / 2)

        const leftNums = nums.slice(0, middle)
        if(leftNums.length > 0) this.left = new TreeNode(leftNums, this.from, this.from + middle -1)

        const rightNums = nums.slice(middle)
        if(rightNums.length > 0) this.right = new TreeNode(rightNums, this.from + middle, this.to)
    }
}

TreeNode.prototype.update = function(index, value){
    if(this.from === this.to && this.from === index){
        this.sum = value
    } else if (index <= this.left.to){
        this.sum = this.left.update(index,value) + this.right.sum
    } else {
        this.sum = this.right.update(index, value) + this.left.sum
    }

    return this.sum
}

TreeNode.prototype.getSumRange = function(left, right){
    if(this.from === left && this.to === right) return this.sum

    if(left <= this.left.to){
        if(right <= this.left.to){
            return this.left.getSumRange(left, right)
        } else {
            return this.left.getSumRange(left, this.left.to) + this.right.getSumRange(this.right.from, right)
        }
    } else {
        return this.right.getSumRange(left, right)
    }
}


//solution 2


var NumArray = function(nums) {
    this.nums = nums
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(index, val) {
    this.nums[index] = val
    this.memo = {}
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    if(this.memo[`${left}-${right}`]) return this.memo[`${left}-${right}`]
    let sum = 0
    for(let i=left; i <= right; i++){
        sum += nums[i]
    }
    this.memo[`${left}-${right}`] = sum
    return sum
};
