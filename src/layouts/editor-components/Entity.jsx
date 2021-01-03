import React, { useState } from 'react';
import { RuleSchema } from 'xalgo-rule-processor';
import { Box, FormStandard, Text } from '../../components';

function Entity({ rule, updateRule, active }) {
  // 0. Fill out the section name.
  const sectionName = 'Rule Maintainer';
  //const sectionDesc = 'Begin your rule by providing a title and concise description.';
  const [modified, setModified] = useState(false);

  // 1. Set a state for each element that must be filled.
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  // Don't touch this.
  if (active && !modified) {
    console.log(`${sectionName} section is being edited.`);

    // 2. Ensure each field is set according to the current rule state.
    if (name !== rule.metadata.rule.entity[0].name) setName(rule.metadata.rule.entity[0].name);
    if (url !== rule.metadata.rule.entity[0].url) setUrl(rule.metadata.rule.entity[0].url);
  }

  function saveContent() {
    console.log(`Saving ${sectionName} to state.`);
    rule.metadata.rule.entity[0].name = name;
    rule.metadata.rule.entity[0].url = url;
    updateRule(rule);
    setModified(false);
  }

  return (
    <div onMouseLeave={saveContent}>
      <Box border="1px solid" borderColor="oline" borderRadius="base" p={3} bg="#fff">
        <Text variant="formtitle">Rule Maker Entity</Text>
        <Box p={1} />
        <FormStandard
          name="Rule Maker Entity Name"
          description={RuleSchema.metadata.rule.maintainers[0].__name}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setModified(true);
          }}
        />
        <Box padding={1} />
        <FormStandard
          name="Rule Maker Entity URL"
          description={RuleSchema.metadata.rule.entity[0].__url}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setModified(true);
          }}
        />
      </Box>
    </div>
  );
}

export default Entity;
