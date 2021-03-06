import React, { useState } from 'react';
import { RuleSchema } from 'xalgo-rule-processor';
import { Box, FormStandard, IdDisplay, Text } from '../../components';

function RuleManager({ rule, updateRule, active }) {
  // 0. Fill out the section name.
  const sectionName = 'Rule Manager';
  //const sectionDesc = 'Begin your rule by providing a title and concise description.';
  const [modified, setModified] = useState(false);

  // 1. Set a state for each element that must be filled.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Don't touch this.
  if (active && !modified) {
    console.log(`${sectionName} section is being edited.`);

    // 2. Ensure each field is set according to the current rule state.
    if (name !== rule.metadata.rule.manager[0].name) setName(rule.metadata.rule.manager[0].name);
    if (email !== rule.metadata.rule.manager[0].email)
      setEmail(rule.metadata.rule.manager[0].email);
  }

  function saveContent() {
    console.log(`Saving ${sectionName} to state.`);
    rule.metadata.rule.manager[0].name = name;
    rule.metadata.rule.manager[0].email = email;
    updateRule(rule);
    setModified(false);
  }

  return (
    <div onMouseLeave={saveContent}>
      <Box border="1px solid" borderColor="oline" borderRadius="base" p={3} bg="#fff">
        <Text variant="formtitle">Rule Manager</Text>
        <Box p={1} />
        <IdDisplay message={rule.metadata.rule.manager[0].id || 'Unregistered User '} />
        <Box padding={1} />
        <FormStandard
          name="Name"
          description={RuleSchema.metadata.rule.manager[0].__name}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setModified(true);
          }}
        />
        <Box padding={1} />
        <FormStandard
          name="Email"
          description={RuleSchema.metadata.rule.manager[0].__email}
          value={email}
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
            setModified(true);
          }}
        />
      </Box>
    </div>
  );
}

export default RuleManager;
