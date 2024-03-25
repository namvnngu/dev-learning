package nnfunny.gui;

import javax.swing.*;
import java.awt.*;

public class NewWindow {
  JFrame frame = new JFrame();
  JLabel label = new JLabel("Hello");

  NewWindow() {
    label.setBounds(0, 0, 100, 100);
    label.setBackground(Color.BLUE);

    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.add(label);
    frame.setSize(500, 500);
    frame.setLayout(null);
    frame.setVisible(true);
  }
}
