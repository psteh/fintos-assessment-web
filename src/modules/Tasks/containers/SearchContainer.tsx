import React, { BaseSyntheticEvent, FC, useState } from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const { Search } = Input;

interface ISearchContainer {}

const StyledSearchContainer = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

const StyledSearch = styled(Search)`
  .ant-input-wrapper,
  .ant-input-affix-wrapper,
  .ant-input-group-addon > button {
    height: 48px;
    font-size: 24px;
  }

  .ant-input-group-addon > button {
    width: 64px !important;
  }
`;

const SearchContainer: FC<ISearchContainer> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(null);

  const search = searchParams.get('search') || '';

  const handleSearch = (search: string) => {
    let searchQueryParam = '';
    if (search && search.length > 0) {
      searchQueryParam = `&search=${search}`;
    }

    router.push(`${pathname}?page=1${searchQueryParam}`);
  };

  const onChange = (e: BaseSyntheticEvent) => setValue(e.target.value);

  return (
    <StyledSearchContainer>
      <StyledSearch
        placeholder="Search..."
        allowClear
        size="large"
        value={value ?? search}
        onChange={onChange}
        onSearch={handleSearch}
      />
    </StyledSearchContainer>
  );
};

export default SearchContainer;
