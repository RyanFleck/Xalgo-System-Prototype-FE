import React, { useState } from 'react';
import { deepCopy } from 'xalgo-rule-processor';
import { Box, Text, Flex, Button, Dropdown, Option, Input, Modal, InputField } from '..';

const fillBox = {
  borderBottom: '1px solid #696969',
  minWidth: 80,
  marginLeft: 4,
  marginRight: 4,
  height: 18,
};

const smallFillBox = {
  borderBottom: '1px solid #696969',
  minWidth: 20,
  marginLeft: 4,
  marginRight: 4,
  height: 18,
};

function SentenceConstructorField({ contentField, small }) {
  if (!contentField) {
    return <div style={small ? smallFillBox : fillBox} />;
  }
  return (
    <div style={small ? smallFillBox : fillBox}>
      <Text>{contentField}</Text>
    </div>
  );
}

export default function SentenceEditor(props) {
  const { rule, index, active, modalEditingInput, updateRule } = props;

  // participle,
  const [participle, setParticiple] = useState('');
  // attribute,
  const [attribute, setAttribute] = useState('');
  // subject,
  const [subject, setSubject] = useState('');
  // operation,
  const [operation, setOperation] = useState('==');
  // value,
  const [value, setValue] = useState('');

  const [modified, setModified] = useState(false);

  const sentence = modalEditingInput ? rule.input_conditions[index] : rule.output_assertions[index];

  if (active && !modified) {
    console.log(`Editing ${modalEditingInput ? 'input' : 'output'} sentence ${index}`);
    if (participle !== sentence.context.participle) setParticiple(sentence.context.participle);
    if (attribute !== sentence.context.attribute) setAttribute(sentence.context.attribute);
    if (subject !== sentence.context.subject) setSubject(sentence.context.subject);
    if (operation !== sentence.context.operation) setOperation(sentence.context.operation);
    if (value !== sentence.context.value) setValue(sentence.context.value);
  }

  return (
    <Box>
      {modalEditingInput ? (
        <Text variant="formtitle">Modify Input Condition</Text>
      ) : (
        <Text variant="formtitle">Modify Output Assertion</Text>
      )}
      <Box padding={2} />
      <Box>
        <Flex justifyContent="space-between">
          <Flex flexWrap="wrap">
            <Text>The</Text>
            <SentenceConstructorField contentField={participle} />
            <SentenceConstructorField contentField={attribute} />
            <Text>of the</Text>
            <SentenceConstructorField contentField={subject} />
            <Text>is</Text>
            <SentenceConstructorField contentField={operation} small />
            <SentenceConstructorField contentField={value} />
          </Flex>
        </Flex>
        <Modal isOpen>
          <Box padding={1} />
          <Flex alignItems="center">
            <Text>The</Text>
            <Box padding={1} />
            <Box>
              <Input
                value={participle}
                placeholder="participle"
                onChange={(e) => {
                  setParticiple(e.target.value);
                  setModified(true);
                }}
              />
            </Box>
            <Box padding={1} />
            <Box>
              <Input
                value={attribute}
                placeholder="attribute"
                onChange={(e) => {
                  setAttribute(e.target.value);
                  setModified(true);
                }}
              />
            </Box>
          </Flex>
          <Box padding={1} />
          <Flex alignItems="center">
            <Text>Of the</Text>
            <Box padding={1} />
            <Box>
              <Input
                value={subject}
                placeholder="subject"
                onChange={(e) => {
                  setSubject(e.target.value);
                  setModified(true);
                }}
              />
            </Box>
            <Box padding={1} />
            <Box>
              <Dropdown
                value={operation}
                onChange={(e) => {
                  setOperation(e.target.value);
                  setModified(true);
                }}
              >
                <Option value="==">==</Option>
                <Option value="!=">!=</Option>
                <Option value=">">&gt;</Option>
                <Option value="<">&lt;</Option>
                <Option value=">=">&gt;=</Option>
                <Option value="<=">&lt;=</Option>
              </Dropdown>
            </Box>
          </Flex>
          <Box padding={1} />
          <InputField
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setModified(true);
            }}
            message="Adjective, Arithmetic expression, or Boolean Number"
          />
          {/*
            <Rule />
            <Flex alignItems="center">
              <Text color="primary">Sum</Text>
              <Box padding={1} />
              <Text color="primary">Filter</Text>
              <Box padding={1} />
              <Text color="primary">Source</Text>
            </Flex>
            */}
        </Modal>
      </Box>

      <Box padding={2} />
      <Button
        variant="blue"
        onClick={() => {
          const ruleCopy = deepCopy(rule);

          const sentenceCopy = modalEditingInput
            ? ruleCopy.input_conditions[index]
            : ruleCopy.output_assertions[index];
          // participle,
          sentenceCopy.context.participle = participle;
          // attribute,
          sentenceCopy.context.attribute = attribute;
          // subject,
          sentenceCopy.context.subject = subject;
          // operation,
          sentenceCopy.context.operation = operation;
          // value,
          sentenceCopy.context.value = value;

          updateRule(ruleCopy);
        }}
      >
        Save and Close
      </Button>
    </Box>
  );
}
