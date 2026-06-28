"use client";

import * as React from "react";

import { Checkbox } from "./checkbox";
import { Select, type SelectOption } from "./select";

interface FormSelectProps {
  defaultValue?: string | number;
  form?: string;
  id?: string;
  name: string;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
}

export function FormSelect({
  defaultValue,
  form,
  id,
  name,
  options,
  placeholder,
  required,
}: FormSelectProps) {
  const [value, setValue] = React.useState(defaultValue == null ? "" : String(defaultValue));

  return (
    <>
      <Select
        id={id}
        value={value}
        onValueChange={setValue}
        options={options}
        placeholder={placeholder}
      />
      <input form={form} name={name} required={required} type="hidden" value={value} />
    </>
  );
}

interface FormCheckboxProps {
  defaultChecked?: boolean;
  form?: string;
  id?: string;
  label: string;
  name: string;
}

export function FormCheckbox({
  defaultChecked,
  form,
  id,
  label,
  name,
}: FormCheckboxProps) {
  const [checked, setChecked] = React.useState(Boolean(defaultChecked));

  return (
    <label className="flex items-center gap-2 text-sm" htmlFor={id}>
      <Checkbox id={id} checked={checked} onCheckedChange={setChecked} />
      {checked ? <input form={form} name={name} type="hidden" value="on" /> : null}
      {label}
    </label>
  );
}
