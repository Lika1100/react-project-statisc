export function groupMetadataByEvents(data) {
  const groups = []
  const lines = data.split("\n");
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      groups.push([]);
    }
    if (groups.length === 0) {
      continue;
    }
    groups.at(-1).push(line);
  }
  return groups;
}
