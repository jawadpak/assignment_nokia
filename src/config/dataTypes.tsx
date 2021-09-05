export interface Data {
  id: string;
  isSelected: boolean;
  operation: string;
  scope: string;
  timestamp: string;
  status: string;
}

type MyBoolean = true | false | null | undefined; // same as boolean
