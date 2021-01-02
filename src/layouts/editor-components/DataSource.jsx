import React, { useState } from 'react';
import { RuleSchema, deepCopy } from 'xalgo-rule-processor';
import { Box, Button, FormStandard, Text, Flex } from '../../components';

function DataSource({ rule, updateRule, active, indice }) {
  // indice. Fill out the section name.
  const sectionName = 'Rule Maintainer';
  //const sectionDesc = 'Begin your rule by providing a title and concise description.';
  const [modified, setModified] = useState(false);

  // 1. Set a state for each element that must be filled.
  const [country, setCountry] = useState('');
  const [subCountry, setSubCountry] = useState('');

  // Don't touch this.
  if (active && !modified) {
    console.log(`${sectionName} section is being edited.`);

    // 2. Ensure each field is set according to the current rule state.
    if (country !== rule.input_context.jurisdiction[indice].country)
      setCountry(rule.input_context.jurisdiction[indice].country);
    if (subCountry !== rule.input_context.jurisdiction[indice].subcountry)
      setSubCountry(rule.input_context.jurisdiction[indice].subcountry);
  }

  function deleteJurisdiction(i) {
    const updatedRule = deepCopy(rule);
    updatedRule.input_context.jurisdiction.splice(i, 1);
    updateRule(updatedRule);
  }

  function saveContent() {
    console.log(`Saving ${sectionName} to state.`);
    const updatedRule = deepCopy(rule);
    updatedRule.input_context.jurisdiction[indice].country = country;
    updatedRule.input_context.jurisdiction[indice].subcountry = subCountry;
    updateRule(updatedRule);
    setModified(false);
  }

  return (
    <div onMouseLeave={saveContent}>
      <Box border="1px solid" borderColor="oline" borderRadius="base" p={3} bg="#fff">
        <Flex>
          <Text variant="formtitle">Jurisdiction</Text>{' '}
          <Button
            variant="invisible"
            color="red"
            onClick={() => {
              deleteJurisdiction(indice);
            }}
          >
            <Text color="#ff6e6e">&nbsp;{'x'}</Text>
          </Button>
        </Flex>
        <Box p={1} />
        <FormStandard
          name="Country Jurisdiction"
          description={RuleSchema.input_context.jurisdiction[0].__country}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setModified(true);
          }}
        />
        <Box padding={1} />
        <FormStandard
          name="Sub-country Jurisdiction"
          description={RuleSchema.input_context.jurisdiction[0].__subcountry}
          value={subCountry}
          onChange={(e) => {
            setSubCountry(e.target.value);
            setModified(true);
          }}
        />
      </Box>
      <Box padding={1} />
    </div>
  );
}

export default DataSource;
