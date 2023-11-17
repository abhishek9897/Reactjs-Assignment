const SavedEntries = ({ savedEntries }) => {
    return (
      <div>
        <h3>Saved Entries</h3>
        {
            savedEntries && <pre>{JSON.stringify(savedEntries, null, 2)}</pre>
        }
      </div>

    );
  };
  export default SavedEntries