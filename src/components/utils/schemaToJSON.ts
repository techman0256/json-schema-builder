const parseSchemaToJSON = (schemaObj: any): any => {
    console.log(schemaObj, "this is schema obj");
    
  const result: any = {};

  for (const key in schemaObj) {
      
      const field = schemaObj[key];
      console.log("this is the key ", key, " and this is the field " , field);

    if (field?.label === undefined || field?.type === undefined) continue;

    // If field is nested, recurse
    console.log('field label', field.label);
    if (field.type === 'nested' && field.children) {
        const childKeys = Object.keys(field.children);
      const firstChildKey = childKeys[0];

      // Detect extra nesting: if children[fieldKey] exists and is also an object
      const nestedChildren =
        childKeys.length === 1 && typeof field.children[firstChildKey] === 'object' &&
        Object.values(field.children[firstChildKey]).every(val => typeof val === 'object')
          ? field.children[firstChildKey]  // Unwrap
          : field.children;

      result[field.label] = parseSchemaToJSON(nestedChildren);
      
    } else {
        result[field.label] = field.type;
    }
    console.log("after result", result[field.label]);
  }

  console.log("this is the result", result);
  
  return result;
};

export default parseSchemaToJSON;