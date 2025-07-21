import { Button } from "./ui/button";
import Row from "@/components/Row";
import { getValueAtPath, updateNestedValue } from "@/components/utils/jsonHelpers";
import { useEffect } from "react";
import type { ValueType, RowValue } from "@/components/Row"

interface JSONObjectProps {
  schema: any;
  setSchema: (schema: any) => void;
  path: string[];
}

const JSONObject = ({ schema, setSchema, path }: JSONObjectProps) => {
    const handleAddRow = () => {
        const key = `key_${Date.now()}`;
        const value = {label : "", type: "string"}
        const updated = updateNestedValue(schema, path, (prev) => ({
            ...prev,
            [key]: value,
            }));
        setSchema(updated);
    };

    const handleKeyRename = (oldKey: string, newKey: string) => {
        // console.log("running handlekey rename");
        
        const updatedSchema = updateNestedValue(schema, path, (prev: any) => {
            const node = prev[oldKey];
            const rest = Object.fromEntries(
                Object.entries(prev).filter(([key]) => key !== oldKey)
            );
            if (!node) return prev;   
            
            return {
                ...rest,
                [oldKey]: {
                ...node,
                label: newKey,
                },
            };
        });
        // console.log("running set schema", updatedSchema);
        
        setSchema(updatedSchema);
    };

    const handleTypeChange = (key: string, newType: ValueType) => {
        const updatedSchema = updateNestedValue(schema, path, (prev: any) => {
            const node = prev[key];
            const rest = Object.fromEntries(
                Object.entries(prev).filter(([k]) => k !== key)
            );
            if (!node) return prev;                // key not found—no change
            
            const updatedNode: any = {
                ...node,
                type: newType,
            };
            // console.log("this is updated node", updatedNode);
            // console.log("this is rest ", rest);
            
            
            if (newType === 'nested') {
                updatedNode.children = node.children || {};
            } else {
            // If changing from nested to non-nested, remove children
                if ('children' in updatedNode) {
                    delete updatedNode.children;
                }
            }
            return {
                ...rest,
                [key]: updatedNode,
            };
        });
        // console.log("this is the updated schema", updatedSchema);
        
        setSchema(updatedSchema);
    };

    const handleDelete = (key: string) => {
        const updatedSchema = updateNestedValue(schema, path, (prev: any) => {
            const { [key]: _, ...rest } = prev;
            return rest;
        });
        setSchema(updatedSchema);
    };


  const currentObject = getValueAtPath(schema, path);

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-lg">Object</h4>
        <Button onClick={handleAddRow}>Add Row</Button>
      </div>

      <div className="space-y-2">
        { currentObject &&
            Object.entries(currentObject).map(([key, value]) => {
                const rowValue = value as RowValue;
                return (
                rowValue.type === 'nested'
                    ? 
                    <div> 
                        <Row
                        key={key}
                        uid={key}
                        path={[...path, key]}
                        defaultKey={rowValue.label}
                        defaultType={rowValue.type}
                        onKeyChange={handleKeyRename}
                        onTypeChange={handleTypeChange}
                        onDelete={() => handleDelete(key)}
                        > 
                            <JSONObject key={key} schema={rowValue.children} 
                                setSchema={(updatedChildren) => {
                                    console.log("this is updated children", updatedChildren);
                                    
                                    const updatedSchema = updateNestedValue(schema, path, (prev: any) => ({
                                        ...prev,
                                        [key]: {
                                        ...prev[key],
                                        children: updatedChildren,
                                        },
                                    }));
                                    console.log("upadeted schema is this ", updatedSchema);
                                    
                                    setSchema(updatedSchema);
                                }} 
                                path={[...path, key]} />
                        </Row>
                    </div>
                    : <Row
                        key={key}
                        uid={key}
                        path={[...path, key]}
                        defaultKey={rowValue.label}
                        defaultType={rowValue.type}
                        onKeyChange={handleKeyRename}
                        onTypeChange={handleTypeChange}
                        onDelete={() => handleDelete(key)}
                    />
                );
            })
            }

      </div>
    </div>
  );
};

export default JSONObject;
