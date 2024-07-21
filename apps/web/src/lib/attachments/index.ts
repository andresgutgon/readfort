export { AttachmentFactory } from './AttachmentFactory'

/* // Then, declare types for our dynamic methods */
/* type DynamicAttachmentMethods<T> = { */
/*   [P in `add${Capitalize<string & T>}` | `remove${Capitalize<string & T>}` | `get${Capitalize<string & T>}` | `get${Capitalize<string & T>}Url`]: () => void; */
/* }; */
/**/
/* // Factory function to create an Attachment instance with dynamic methods */
/* function createAttachment<T extends string>(rel: T): Attachment & DynamicAttachmentMethods<T> { */
/*   const attachment = new Attachment(rel); */
/**/
/*   const baseMethodName = `${rel.charAt(0).toUpperCase()}${rel.substring(1)}`; */
/*   attachment[`add${baseMethodName}`] = function() { */
/*     console.log(`Add called for ${rel}`); */
/*   }; */
/*   attachment[`remove${baseMethodName}`] = function() { */
/*     console.log(`Remove called for ${rel}`); */
/*   }; */
/*   attachment[`get${baseMethodName}`] = function() { */
/*     console.log(`Get called for ${rel}`); */
/*   }; */
/*   attachment[`get${baseMethodName}Url`] = function() { */
/*     console.log(`GetUrl called for ${rel}`); */
/*   }; */
/**/
/*   return attachment as Attachment & DynamicAttachmentMethods<T>; */
/* } */
