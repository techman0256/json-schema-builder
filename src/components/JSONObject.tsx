import { Button } from "./ui/button";
import Row from "@/components/Row";
import { getValueAtPath, updateNestedValue } from "@/components/utils/jsonHelpers"; // helper functions
import { useEffect } from "react";
import type { ValueType } from "@/components/Row"

interface JSONObjectProps {
  schema: any;
  setSchema: (schema: any) => void;
  path: string[];
}

const JSONObject = ({ schema, setSchema, path }: JSONObjectProps) => {
    const handleAddRow = () => {
        const key = "";
        const value = "string";
        
        console.log("Running add row >>>>>>>>", key, value);
        const updated = updateNestedValue(schema, path, (prev) => ({
            ...prev,
            [key]: value,
            }));
        setSchema(updated);
    };

    const handleKeyRename = (oldKey: string, newKey: string) => {
        setSchema(
            updateNestedValue(schema, path, (prev: Record<string, any>) => {
            const { [oldKey]: value, ...rest } = prev;
            return {
                ...rest,
                [newKey]: value,
            };
            })
        );
    };

    const handleTypeChange = (key: string, newType: ValueType) => {
        setSchema(
            updateNestedValue(schema, path, (prev: Record<string, any>) => ({
            ...prev,
            [key]: newType,
            }))
        );
    };

    const handleDelete = (key: string) => {
        const updatedSchema = updateNestedValue(schema, path, (prev: any) => {
            const { [key]: _, ...rest } = prev;
            return rest;
        });
        setSchema(updatedSchema);
    };


  const currentObject = getValueAtPath(schema, path);
  useEffect(() => {
    console.log("The current object level is ", currentObject, path);
    // console.log(Object.entries(currentObject).map(([key, value]) => {
    //     console.log(key, value);
        
    // }));
  }, [currentObject]);

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-lg">Object</h4>
        <Button onClick={handleAddRow}>Add Row</Button>
      </div>

      <div className="space-y-2">
        { currentObject &&
            Object.entries(currentObject).map(([key, value]) => {
                const rowValue = value as ValueType;
                return (
                rowValue === 'nested'
                    ? <JSONObject key={key} schema={schema} setSchema={setSchema} path={[...path, key]} />
                    : <Row
                        key={key}
                        path={[...path, key]}
                        defaultKey={key}
                        defaultType={rowValue}
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
