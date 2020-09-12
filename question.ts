// Hi I'm practicing making BST class and am working on the remove method...

// this code chunk is right after the method has recursed down to find the value that we wish to remove. 

//   else {
//   let nullableNode: Node_ | null = node;
//   if (!node.left_ && !node.right_) {
//     nullableNode = null;
//     return null;
//   }
//   else if (!node.left_ && node.right_) {
//     node = node.right_;
//     return node;
//   } else if (!node.right_ && node.left_) {
//     node = node.left_;
//     return node;
//   }
//   //both left and right
//   else if (node.right_ && node.left_) {
//     let minOfRightSubTree = this.findMinNode(node.right_);
//     if (minOfRightSubTree) {
//       node.data_ = minOfRightSubTree.data_;
//     } else if (!minOfRightSubTree) {
//       throw Error("broke please troubleshoot")
//     }
//     node.right_ = this.removeNode(node.right_, minOfRightSubTree.data_);
//     return node;
//   }
//   throw Error("should not hit, please troubleshoot. helping compiler understand this function wont return undefined")
// }


// you see I have those extra && node checks in the subsequent else if that make sure the node is not null... but I thought maybe TS can infer that those nodes are not null. But when I remove those extra checks TS warns that the node may be be null. 

// for example this check ->       else if (node.right && node.left) {
// I thought they both be guaranteed to exist due to the previous checks. Is there a way I can improve this code for TS to infer better?


//brilliant answer from Retsam

// Hmm, I think TS doesn't do great about trying to infer with two variables at once.
// In general it doesn't do relationships between variables, so checking something about node.right_ doesn't actually imply anything about node.left_, even though it does, given the full boolean logic
// An interesting workaround, instead of having a type like
// type Node = {
//    _left?: Node,
//    _right?: Node
// }

// if you make it an explicit union, this works.
// type Node = {
//    _left: Node,
//    _right: undefined,
// } | { 
//    _right: Node,
//    _left: undefined,
// } | {
//    _left: Node,
//    _right: Node,
// } | {
//    _left: undefined,
//    _right: undefined;
// }
// In the normal way of doing it, when you check !node.right_, it doesn't actually change the type of node (just of node.right_), but if you make node a union, then it does.  Checking !node.right narrows the union to the cases where _right is undefined.
// TypeScript
// BOT
// Today at 9:11 PM

// Retsam19#2505
// Shortened Playground link
// Retsam-"Don't use React.FC"-19Today at 9:12 PM
// I don't know that I'd actually go and redefine your node data structure, but if you want to make the logic work without casting, you could temporarily cast it into this form...
// Otherwise this may be a reasonable place for the ! operator.