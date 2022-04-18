import moment from "moment";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

function MedCloudForm(props: { data: any }) {
  useEffect(() => {}, []);

  return (
    <>
      <Form>
        {props.data.mode === "edit" ? (
          <>
            {props.data.fields.map((field: any) => (
              <Form.Group key={field.field}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  placeholder={field.label}
                  defaultValue={
                    field.type == "date"
                      ? moment(props.data[field.field]).format(
                          "YYYY-MM-DD"
                        )
                      : props.data[field.field]
                  }
                  onChange={(e: any) => {
                    field.type == "date"
                      ? (props.data[field.field] = moment(
                          e.target.value
                        ).format("YYYY-MM-DD"))
                      : (props.data[field.field] = e.target.value);
                  }}
                />
              </Form.Group>
            ))}
          </>
        ) : (
          <></>
        )}
      </Form>
    </>
  );
}

export default MedCloudForm;
