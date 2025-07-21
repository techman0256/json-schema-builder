import { Input } from "./ui/input";
// import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export type ValueType = "string" | "number" | "nested";

export interface RowValue {
    label : 'string';
    type : ValueType;
    children? : any;
}

interface RowProps {
  path: string[];               // <- Add this
  uid: string;
  onDelete: () => void;
  onKeyChange: (oldKey: string, newKey: string) => void;
  onTypeChange: (key: string, newType: ValueType) => void;
  defaultKey?: string;
  defaultType?: ValueType;
  children?: React.ReactNode;
}


const Row = ({onDelete, onKeyChange, onTypeChange, uid, defaultKey = "", defaultType = "string", children} : RowProps) => {
    const [keyInput, setKeyInput] = useState(defaultKey);
    const [valueType, setValueType] = useState<ValueType>(defaultType);

    const handleKeyChange = (val: string) => {
        setKeyInput(val);
        onKeyChange(uid, val);
    };

    const handleTypeChange = (val: ValueType) => {
        setValueType(val);
        onTypeChange(uid, val);
    };

    return (
        <div>

            <div className="flex items-center gap-4 border p-4 rounded-lg mb-2">
                {/* Key Input */}
                <Input
                    placeholder={""}
                    value={keyInput}
                    onChange={(e) => handleKeyChange(e.target.value)}
                    className="w-1/3"
                />

                {/* Value Type Dropdown */}
                <Select value={valueType} onValueChange={handleTypeChange}>
                    <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="string">String</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="nested">Nested</SelectItem>
                    </SelectContent>
                </Select>

                {/* Delete Button */}
                <Button variant="destructive" size="icon" onClick={onDelete}>
                    <Trash2 size={18} />
                </Button>
            </div>
            <div className="ml-[40px]">
                {children}
            </div>
        </div>
    )
}

export default Row;