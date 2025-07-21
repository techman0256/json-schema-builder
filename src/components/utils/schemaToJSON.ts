const parseSchemaToJSON = (schemaObj: any): any => {    
  const result: any = {};

  for (const key in schemaObj) {
    const field = schemaObj[key];

    if (field?.label === undefined || field?.type === undefined) continue;

    // If field is nested, 
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
  }
  
  return result;
};

export default parseSchemaToJSON;