import React, { useState } from 'react';
import { RuleSchema } from 'xalgo-rule-processor';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { Box, Flex, Dropdown, Text, FormDropdown } from '../../components';
import { deepCopy } from 'xalgo-rule-processor/dist/utilities';

function Time({ rule, updateRule, active, section, label, start = false, end = false }) {
  // 0. Fill out the section name.
  const sectionName = 'Time Information';
  // const sectionDesc = 'Begin your rule by providing a title and concise description.';
  const [modified, setModified] = useState(false);

  // 1. Set a state for each element that must be filled.
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [second, setSecond] = useState('');
  const [timezone, setTimezone] = useState('UTC±00:00');

  function parseDate(d) {
    // Converts a date or string to a valid date object.
    const date = new Date(d);
    return date;
  }

  function formatDate(d) {
    // Formats a date as a correct UTC string.
    return d.toUTCString();
  }

  // Don't touch this.
  if (active && !modified) {
    console.log(`${sectionName} section is being edited.`);
    let savedDate;
    if (start) {
      savedDate = parseDate(rule.requirements.time.start);
    } else if (end) {
      savedDate = parseDate(rule.requirements.time.end);
    }

    console.log(`date: ${typeof date}: ${date}`);
    console.log(`savedDate: ${typeof savedDate}: ${savedDate}`);

    if(savedDate && (!date || formatDate(date) !== formatDate(savedDate))){
      console.log("Setting date...");
      setDate(savedDate);
    }
    // 2. Ensure each field is set according to the current rule state.
    // if (url !== rule.metadata.rule.url) setUrl(rule.metadata.rule.url);
  }

  function saveContent() {
    // Remember not to modify the rule prop.
    const newRule = deepCopy(rule);
    console.log(`Saving ${sectionName} to state.`);
    // newRule.metadata.rule.url = url;
    if(start && date){
      newRule.requirements.time.start = formatDate(date);
      updateRule(newRule);
      setModified(false);
    }else if(end && date){
      newRule.requirements.time.end = formatDate(date);
      updateRule(newRule);
      setModified(false);
    }
  }

  return (
    <div onMouseLeave={saveContent}>
      <Box border="1px solid" borderColor="oline" borderRadius="base" p={3} bg="#fff">
        <Text variant="formtitle">{label}</Text>
        <Box padding={1} />
        <DayPickerInput
          value={date}
          onDayChange={(d) => {
            setDate(d);
            setModified(true);
          }}
        />
        <Box padding={1} />
        <Flex alignItems="center">
          <Dropdown
            disabled
            value={hour}
            onChange={(e) => {
              setHour(e.target.value);
              setModified(true);
            }}
          >
            <option hidden value="">
              Hour
            </option>
            <option>00</option>
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
            <option>35</option>
            <option>36</option>
            <option>37</option>
            <option>38</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45</option>
            <option>46</option>
            <option>47</option>
            <option>48</option>
            <option>49</option>
            <option>50</option>
            <option>51</option>
            <option>52</option>
            <option>53</option>
            <option>54</option>
            <option>55</option>
            <option>56</option>
            <option>57</option>
            <option>58</option>
            <option>59</option>
          </Dropdown>
          <Box padding={1} />
          <Dropdown
            disabled
            value={minute}
            onChange={(e) => {
              setMinute(e.target.value);
              setModified(true);
            }}
          >
            <option hidden value="">
              Minute
            </option>
            <option>00</option>
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
            <option>35</option>
            <option>36</option>
            <option>37</option>
            <option>38</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45</option>
            <option>46</option>
            <option>47</option>
            <option>48</option>
            <option>49</option>
            <option>50</option>
            <option>51</option>
            <option>52</option>
            <option>53</option>
            <option>54</option>
            <option>55</option>
            <option>56</option>
            <option>57</option>
            <option>58</option>
            <option>59</option>
          </Dropdown>
          <Box padding={1} />
          <Dropdown
            value={second}
            disabled
            onChange={(e) => {
              setSecond(e.target.value);
              setModified(true);
            }}
          >
            <option hidden value="">
              Second
            </option>
            <option>00</option>
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
            <option>35</option>
            <option>36</option>
            <option>37</option>
            <option>38</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45</option>
            <option>46</option>
            <option>47</option>
            <option>48</option>
            <option>49</option>
            <option>50</option>
            <option>51</option>
            <option>52</option>
            <option>53</option>
            <option>54</option>
            <option>55</option>
            <option>56</option>
            <option>57</option>
            <option>58</option>
            <option>59</option>
          </Dropdown>
        </Flex>
        <Box padding={1} />
        <FormDropdown
          name="Time Zone"
          disabled
          description={RuleSchema.input_context.__timezone}
          value={timezone}
          onChange={(e) => {
            setTimezone(e.target.value);
            setModified(true);
          }}
          options={[
            { value: 'UTC−12:00', label: 'UTC−12:00' },
            { value: 'UTC−11:00', label: 'UTC−11:00' },
            { value: 'UTC−10:00', label: 'UTC−10:00' },
            { value: 'UTC−09:30', label: 'UTC−09:30' },
            { value: 'UTC−09:00', label: 'UTC−09:00' },
            { value: 'UTC−08:00', label: 'UTC−08:00' },
            { value: 'UTC−07:00', label: 'UTC−07:00' },
            { value: 'UTC−06:00', label: 'UTC−06:00' },
            { value: 'UTC−05:00', label: 'UTC−05:00' },
            { value: 'UTC−04:00', label: 'UTC−04:00' },
            { value: 'UTC−03:30', label: 'UTC−03:30' },
            { value: 'UTC−03:00', label: 'UTC−03:00' },
            { value: 'UTC−02:00', label: 'UTC−02:00' },
            { value: 'UTC−01:00', label: 'UTC−01:00' },
            { value: 'UTC±00:00', label: 'UTC±00:00' },
            { value: 'UTC+01:00', label: 'UTC+01:00' },
            { value: 'UTC+02:00', label: 'UTC+02:00' },
            { value: 'UTC+03:00', label: 'UTC+03:00' },
            { value: 'UTC+03:30', label: 'UTC+03:30' },
            { value: 'UTC+04:00', label: 'UTC+04:00' },
            { value: 'UTC+04:30', label: 'UTC+04:30' },
            { value: 'UTC+05:00', label: 'UTC+05:00' },
            { value: 'UTC+05:30', label: 'UTC+05:30' },
            { value: 'UTC+05:45', label: 'UTC+05:45' },
            { value: 'UTC+06:00', label: 'UTC+06:00' },
            { value: 'UTC+06:30', label: 'UTC+06:30' },
            { value: 'UTC+07:00', label: 'UTC+07:00' },
            { value: 'UTC+08:00', label: 'UTC+08:00' },
            { value: 'UTC+08:45', label: 'UTC+08:45' },
            { value: 'UTC+09:00', label: 'UTC+09:00' },
            { value: 'UTC+09:30', label: 'UTC+09:30' },
            { value: 'UTC+10:00', label: 'UTC+10:00' },
            { value: 'UTC+10:30', label: 'UTC+10:30' },
            { value: 'UTC+11:00', label: 'UTC+11:00' },
            { value: 'UTC+12:00', label: 'UTC+12:00' },
            { value: 'UTC+12:45', label: 'UTC+12:45' },
            { value: 'UTC+13:00', label: 'UTC+13:00' },
            { value: 'UTC+14:00', label: 'UTC+14:00' },
          ]}
        />
      </Box>
    </div>
  );
}

export default Time;
