import { Html } from "@react-three/drei";
import {
  Paper,
  Title,
  NumberInput,
  Group,
  ActionIcon,
  Stack,
  MantineProvider,
  Text,
  Flex,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Vector3 } from "three";
import { BuildingData, calculateSizeAndPosition } from "../../types";
import { memo } from "react";

interface BuildingPopupProps extends BuildingData {
  onChange: (payload: Partial<BuildingData>) => void;
  onDelete: (id: string) => void;
}

function BuildingPopup({
  minCorner,
  maxCorner,
  floorHeight,
  id,
  numberOfFloors,
  onChange,
  onDelete,
}: BuildingPopupProps) {
  const { size, position } = calculateSizeAndPosition(minCorner, maxCorner);

  const handleChange = (
    field: keyof Omit<BuildingData, "id">,
    value: number | Vector3 | string
  ) => {
    onChange({ [field]: value });
  };

  const handleSizeChange = (dimension: "x" | "y", value: number) => {
    const newMaxCorner = maxCorner.clone();

    if (dimension === "x") {
      newMaxCorner.x = minCorner.x + value;
    } else {
      newMaxCorner.y = minCorner.y + value;
    }
    onChange({ maxCorner: newMaxCorner });
  };

  return (
    <Html
      position={[position.x + size.x / 2, position.y, position.z]}
      onClick={(e) => e.stopPropagation()}
    >
      <MantineProvider>
        <Paper
          shadow="sm"
          p="md"
          withBorder
          style={{ minWidth: 320 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Group justify="space-between" mb="md">
            <Title order={4}>Building {id}</Title>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(id)}
              aria-label="Delete building"
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>

          <Stack gap="sm">
            <Flex align="center" justify="space-between" gap={8}>
              <Text size="sm" w={120} fw={800}>
                Size (m)
              </Text>
              <Flex align="center" gap={8}>
                <NumberInput
                  value={size.x}
                  onChange={(value) => handleSizeChange("x", Number(value))}
                  onClick={(e) => e.stopPropagation()}
                  min={1}
                  step={1}
                  leftSection="X"
                  w={100}
                  clampBehavior="strict"
                  allowDecimal={false}
                />
                <NumberInput
                  value={size.y}
                  onChange={(value) => handleSizeChange("y", Number(value))}
                  onClick={(e) => e.stopPropagation()}
                  min={1}
                  step={1}
                  leftSection="Y"
                  w={100}
                  clampBehavior="strict"
                  allowDecimal={false}
                />
              </Flex>
            </Flex>

            <Flex align="center" justify="space-between">
              <Text size="sm" w={120} fw={800}>
                Floors
              </Text>
              <NumberInput
                value={numberOfFloors}
                onChange={(value) => handleChange("numberOfFloors", value)}
                onClick={(e) => e.stopPropagation()}
                min={1}
                step={1}
                w={100}
                clampBehavior="strict"
                allowDecimal={false}
              />
            </Flex>

            <Flex align="center" justify="space-between">
              <Text size="sm" w={120} fw={800}>
                Floor height (m)
              </Text>
              <NumberInput
                value={floorHeight}
                onChange={(value) => handleChange("floorHeight", value)}
                onClick={(e) => e.stopPropagation()}
                min={0}
                step={0.1}
                w={100}
                clampBehavior="strict"
              />
            </Flex>
          </Stack>
        </Paper>
      </MantineProvider>
    </Html>
  );
}

export default memo(BuildingPopup);
